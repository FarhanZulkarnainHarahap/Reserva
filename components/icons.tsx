import type { IconType } from "react-icons";
import {
  LuArrowRight,
  LuCalendarDays,
  LuCheck,
  LuChevronRight,
  LuClock3,
  LuHeart,
  LuMapPin,
  LuMenu,
  LuMinus,
  LuPhone,
  LuPlus,
  LuSearch,
  LuShoppingBag,
  LuSparkles,
  LuStar,
  LuUserRound,
  LuUsersRound,
  LuX
} from "react-icons/lu";

const icons: Record<string, IconType> = {
  arrow: LuArrowRight,
  bag: LuShoppingBag,
  calendar: LuCalendarDays,
  check: LuCheck,
  chevron: LuChevronRight,
  clock: LuClock3,
  close: LuX,
  heart: LuHeart,
  map: LuMapPin,
  menu: LuMenu,
  minus: LuMinus,
  phone: LuPhone,
  plus: LuPlus,
  search: LuSearch,
  sparkle: LuSparkles,
  star: LuStar,
  user: LuUserRound,
  users: LuUsersRound
};

export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const Component = icons[name] || LuSparkles;
  return <Component aria-hidden="true" size={size} />;
}
