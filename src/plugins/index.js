import {
  Swipe,
  SwipeItem,
  Popup,
  Form,
  Field,
  CellGroup,
  Notify,
  Skeleton,
  SkeletonTitle,
  SkeletonImage,
  SkeletonAvatar,
  SkeletonParagraph,
} from "vant";

let pluginsVant = [
  Swipe,
  SwipeItem,
  Popup,
  Form,
  Field,
  CellGroup,
  Notify,
  Skeleton,
  SkeletonTitle,
  SkeletonImage,
  SkeletonAvatar,
  SkeletonParagraph,
];

export default function getVant(app) {
  pluginsVant.forEach((item) => app.use(item));
}
