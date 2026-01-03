import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/modules/auth/api/auth-queries";
import { Link } from "@tanstack/react-router";

export const MoreInfo = () => {
  const { data, isLoading } = useMe();

  console.log(data, isLoading);

  return (
    <div className="mt-10 flex flex-col gap-4 md:flex-row md:h-200">
      {/* Left column */}
      <div className="flex w-full flex-col gap-4 md:w-[40%] md:h-full">
        {/* Top left */}
        <div className="relative w-full overflow-hidden rounded-md h-44 md:h-auto md:flex-1">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/info/info-1.avif)" }}
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative p-6 justify-end h-full flex flex-col gap-2">
            <h1 className="text-white font-bold text-xl">
              Join the community and share your experiences
            </h1>

            <p className="text-white">Create posts for others to enjoy</p>

            <div className="mt-4">
              {isLoading ? (
                <Skeleton className="h-8 w-20 rounded-md" />
              ) : (
                <Button variant="primary">
                  <Link to={data ? "/posts/create" : "/login"}>
                    {data ? "Create" : "Login"}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden rounded-md h-44 md:h-auto md:flex-1">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/info/info-3.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      <div className="relative w-full overflow-hidden rounded-md border h-72 md:h-full md:w-[60%]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/info/info-2.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative flex h-full items-center justify-center w-200 mx-auto">
          <h1 className="text-white font-bold text-center text-3xl">
            Share, teach, and discuss. Your memories and experiences can help
            others
          </h1>
        </div>
      </div>
    </div>
  );
};
