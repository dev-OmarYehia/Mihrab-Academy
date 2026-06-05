export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b bg-white/70 backdrop-blur-md sticky top-0">
      
      <h1 className="text-xl font-bold tracking-tight">
        Mihrab Academy
      </h1>

      <div className="flex gap-6 text-sm font-medium">
        <a href="/" className="hover:text-blue-600 transition">Home</a>
        <a href="/programs" className="hover:text-blue-600 transition">Programs</a>
        <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
      </div>

    </nav>
  );
}