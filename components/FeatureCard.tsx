type Props = {
    title: string;
    description: string;
  };
  
  export default function FeatureCard({ title, description }: Props) {
    return (
<div className="border rounded-xl p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    );
  }