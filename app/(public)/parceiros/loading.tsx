import ParceirosSkeleton from "@/components/parceiros/ParceirosSkeleton";

export default function ParceirosLoading() {
  return (
    <div className="flex flex-1 flex-col bg-eventos-page p-4 md:p-8">
      <div className="mx-auto w-full max-w-6xl">
        <ParceirosSkeleton />
      </div>
    </div>
  );
}
