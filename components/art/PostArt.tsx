import type { ArtKind } from "@/lib/samples";
import { CatArt } from "./CatArt";
import { DogArt } from "./DogArt";
import { SpaceArt } from "./SpaceArt";
import type { ArtProps } from "./types";

export const ART_DESCRIPTIONS: Record<ArtKind, string> = {
  dog: "Illustration of a fluffy chestnut-and-white puppy looking up at the camera",
  cat: "Meme illustration of a wide-eyed tabby cat captioned “When you hear the treat bag”",
  space: "Illustration of a small rocket flying toward a smiling moon above Earth",
};

export function PostArt({ kind, ...props }: ArtProps & { kind: ArtKind }) {
  if (kind === "cat") return <CatArt {...props} />;
  if (kind === "space") return <SpaceArt {...props} />;
  return <DogArt {...props} />;
}
