type Props = {
    title: string;
    description: string;
  };
  
  export default function ProgramCard({ title, description }: Props) {
    return (
<div className="border rounded-xl p-6 bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
          <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    );
  }