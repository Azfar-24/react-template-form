import {
  useCreatePostMutation,
  useGetPostsQuery,
} from "../../services/apiSlice";

const Home = () => {
  // Using the query to fetch posts
  const {
    data: posts,
    error,
    isLoading,
  } = useGetPostsQuery({ params: {} }, { refetchOnMountOrArgChange: true });

  // Using the mutation to create a new post
  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async () => {
    const newPost = {
      title: "foo",
      body: "bar",
      userId: 1,
    };
    await createPost(newPost);
  };
  return (
    <div
      className="bg-red-500 text-white p-5"
      onClick={() => handleCreatePost()}
    >
      Home
    </div>
  );
};

export default Home;
