export default function Footer() {
    return (
      <footer className="border-t mt-20 py-10 px-6 text-center text-gray-600">
        <h3 className="text-lg font-semibold text-black">
          Mihrab Academy
        </h3>
  
        <p className="mt-2 text-sm">
          Learn Qur'an, Arabic, and Islamic Studies with proper guidance.
        </p>
  
        <p className="mt-4 text-xs text-gray-400">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    );
  }