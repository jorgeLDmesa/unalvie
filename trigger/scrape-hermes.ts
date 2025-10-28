import { task } from "@trigger.dev/sdk/v3";
import { chromium } from "playwright";

export const scrapeHermesTask = task({
  id: "scrape-hermes",
  // Especifica la máquina y timeout para el task
  machine: "small-1x", // Puedes cambiar a "medium-1x" si necesitas más recursos
  run: async (payload: { searchTerm: string }) => {
    console.log("Starting scrape for:", payload.searchTerm);

    // Launch browser in headless mode for production
    const browser = await chromium.launch({
      headless: true,
      // Args para mejor compatibilidad en contenedores
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Navigate to the website
      await page.goto("http://www.hermes.unal.edu.co/", {
        waitUntil: "networkidle",
      });

      console.log("Page loaded, waiting for search input...");

      // Wait for the search input to be visible
      await page.waitForSelector("#j_id_7\\:campo-busqueda", {
        timeout: 10000,
      });

      // Type the search term
      await page.fill("#j_id_7\\:campo-busqueda", payload.searchTerm);
      console.log("Search term entered:", payload.searchTerm);

      // Trigger the keyup event to activate the search
      await page.dispatchEvent("#j_id_7\\:campo-busqueda", "keyup");

      // Wait for results to load
      await page.waitForTimeout(5000);

      console.log("Attempting to extract results...");

      // Extract search results without waiting for specific selector
      const results = await page.evaluate(() => {
        // Try multiple selectors for results
        const container = document.querySelector("#j_id_7\\:busquedaAvanzada") || document.body;

        // Look for common result patterns
        const items = container.querySelectorAll(
          "a[href*='proyectos'], .resultado, .item, tr[onclick], .ui-datatable-data tr"
        );

        return Array.from(items).slice(0, 20).map((item) => {
          const element = item as HTMLElement;
          return {
            text: element.textContent?.trim().substring(0, 200) || "",
            href: element.getAttribute("href") || element.getAttribute("onclick") || "",
          };
        }).filter(item => item.text.length > 0);
      });

      console.log("Results found:", results.length);

      // Get page information
      const title = await page.title();
      const url = page.url();
      const screenshot = await page.screenshot({ fullPage: false });

      return {
        success: true,
        searchTerm: payload.searchTerm,
        title,
        url,
        results,
        screenshotBase64: screenshot.toString("base64"),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Scraping error:", error);
      throw error;
    } finally {
      await browser.close();
      console.log("Browser closed");
    }
  },
});
