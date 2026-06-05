type Props = {
    children: React.ReactNode;
    title?: string;
    description?: string;
  };
  
  export default function Section({ children, title, description }: Props) {
    return (
      <section className="px-6 py-20 max-w-5xl mx-auto">
        
        {title && (
          <h2 className="text-3xl font-bold text-center mb-4">
            {title}
          </h2>
        )}
  
        {description && (
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
            {description}
          </p>
        )}
  
        {children}
  
      </section>
    );
  }