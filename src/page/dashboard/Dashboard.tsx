import Documents from "@/src/components/custom/Documents";

export const dynamic = "force-dynamic";

const Dashboard = () => {
  return (
    <div className="h-full max-w-7xl mx-auto">
      <h1 className="text-indigo-600 p-5 text-lg bg-gray-200 font-extralight md:text-xl lg:text-2xl">
        My documents
      </h1>
      <Documents />
    </div>
  );
};

export default Dashboard;
