export default function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold tracking-tighter">PRASHANT.DEV</span>
            <span className="text-sm text-gray-500 mt-2">Full Stack Developer</span>
          </div>

          <div className="text-sm text-gray-500">
            © 2026 Prashant Prajapati
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href={process.env.NEXT_PUBLIC_GITHUB_LINK || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href={process.env.NEXT_PUBLIC_LINKEDIN_LINK || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:prashantprajapati2711@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
        
        <div className="mt-12 text-center text-xs text-gray-600 font-mono flex items-center justify-center gap-2">
          <span>Built with Next.js + Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
