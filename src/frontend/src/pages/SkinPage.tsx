import CategoryPage from "../components/CategoryPage";
import { categoryInfo } from "../data/remedies";

export default function SkinPage() {
  const { title, description, icon, subcategories } = categoryInfo.skin;
  return (
    <CategoryPage
      title={title}
      description={description}
      icon={icon}
      subcategories={subcategories}
      categoryKey="skin"
    />
  );
}
