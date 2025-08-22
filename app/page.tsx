import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>VIE UNAL</Link>
            </div>
            <div className="flex gap-2">
              <Link 
                href="/auth/login"
                className="border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md font-medium text-sm transition-colors"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </nav>
        
        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl px-6">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Bienvenidos a la Plataforma
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
              Vicedecanatura de Investigación y Extensión
            </h2>
            <h3 className="text-xl md:text-2xl font-medium text-muted-foreground">
              Universidad Nacional de Colombia
            </h3>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Gestiona y supervisa los proyectos de investigación y extensión de manera eficiente y colaborativa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link 
                href="/dashboard" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium transition-colors"
              >
                Acceder al Dashboard
              </Link>
              <Link 
                href="/proyectos" 
                className="border border-input hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-md font-medium transition-colors"
              >
                Ver Proyectos
              </Link>
            </div>
          </div>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
          <p className="text-muted-foreground">
            Universidad Nacional de Colombia - Vicedecanatura de Investigación y Extensión
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
