
interface FontFaceSet {
  readonly ready: Promise<FontFaceSet>;
}

interface Document {
  fonts: FontFaceSet;
}
