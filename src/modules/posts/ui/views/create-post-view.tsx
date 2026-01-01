import { FormProvider, useForm } from "react-hook-form";
import { PreviewPost } from "../components/preview-post";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPostSchema,
  CreatePostValues,
} from "../../domain/create-post-schema";
import { CreatePostSection } from "../sections/create-post-section";

export const CreatePostView = () => {
  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      tagIds: [],
      content: null,
      coverImage: null,
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...form}>
      <div className="max-w-7xl w-[90%] mx-auto mt-6">
        <CreatePostSection />
      </div>
    </FormProvider>
  );
};
