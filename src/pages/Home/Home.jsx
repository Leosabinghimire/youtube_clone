import { useSearchParams } from "react-router-dom";
import CategoryChips from "../../components/CategoryChips/CategoryChips";
import VideoGrid from "../../components/VideoGrid/VideoGrid";
import { getCategory } from "../../constants/categories";
import { useAsync, useDocumentTitle } from "../../hooks";
import { getPopularVideos } from "../../services/youtube";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = getCategory(searchParams.get("c"));
  const { data, loading, error, reload } = useAsync(
    () => getPopularVideos({ categoryId: category.id }),
    [category.id]
  );

  useDocumentTitle(category.id ? category.label : "");

  const selectCategory = (id) => setSearchParams(id ? { c: String(id) } : {});

  return (
    <>
      <CategoryChips value={category.id} onChange={selectCategory} />
      <VideoGrid
        videos={data}
        loading={loading}
        error={error}
        onRetry={reload}
        emptyMessage="There are no trending videos in this category right now."
      />
    </>
  );
}
