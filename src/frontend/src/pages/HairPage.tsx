import CategoryPage from "../components/CategoryPage";
import { categoryInfo } from "../data/remedies";

export default function HairPage() {
  const { title, description, icon, subcategories } = categoryInfo.hair;
  return (
    <CategoryPage
      title={title}
      description={description}
      icon={icon}
      subcategories={subcategories}
      categoryKey="hair"
    />
  );
}
