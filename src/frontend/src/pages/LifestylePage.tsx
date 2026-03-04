import CategoryPage from "../components/CategoryPage";
import { categoryInfo } from "../data/remedies";

export default function LifestylePage() {
  const { title, description, icon, subcategories } = categoryInfo.lifestyle;
  return (
    <CategoryPage
      title={title}
      description={description}
      icon={icon}
      subcategories={subcategories}
      categoryKey="lifestyle"
    />
  );
}
