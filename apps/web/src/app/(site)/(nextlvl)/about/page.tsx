
import { Metadata } from "next"
import allMetadata from "../lib/metadata"
import PageRender from "../components/PageRender/PageRender"

export const metadata: Metadata = { ...allMetadata.about }

export default async function AboutPage() {
  return <>
    <PageRender></PageRender>
  </>
}
