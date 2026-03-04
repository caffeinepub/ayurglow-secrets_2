import CategoryPage from "../components/CategoryPage";
import { categoryInfo } from "../data/remedies";

export default function ChronicPage() {
  const { title, description, icon, subcategories } = categoryInfo.chronic;
  return (
    <CategoryPage
      title={title}
      description={description}
      icon={icon}
      subcategories={subcategories}
      categoryKey="chronic"
    />
  );
}
