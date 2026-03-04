import CategoryPage from "../components/CategoryPage";
import { categoryInfo } from "../data/remedies";

export default function HealthPage() {
  const { title, description, icon, subcategories } = categoryInfo.health;
  return (
    <CategoryPage
      title={title}
      description={description}
      icon={icon}
      subcategories={subcategories}
      categoryKey="health"
    />
  );
}
