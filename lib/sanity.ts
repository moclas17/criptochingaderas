import { client } from '../sanity/lib/client'
import { groq } from 'next-sanity'

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  tags: string[]
  year: number
  siteUrl?: string
  repoUrl?: string
  featured: boolean
  status: 'development' | 'completed' | 'paused' | 'idea'
  image?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "project"] | order(year desc, _createdAt desc) {
      _id,
      title,
      slug,
      description,
      tags,
      year,
      siteUrl,
      repoUrl,
      featured,
      status,
      image
    }`
  )
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "project" && featured == true] | order(year desc, _createdAt desc) {
      _id,
      title,
      slug,
      description,
      tags,
      year,
      siteUrl,
      repoUrl,
      featured,
      status,
      image
    }`
  )
}

export interface PathStep {
  _id: string
  title: string
  stepNumber: number
  summary: string
  learn: string[]
  handsOn: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime?: number
  resources?: {
    title: string
    url: string
    type: 'tutorial' | 'documentation' | 'tool' | 'course' | 'article'
  }[]
}

export async function getPathSteps(): Promise<PathStep[]> {
  return client.fetch(
    groq`*[_type == "pathStep"] | order(stepNumber asc) {
      _id,
      title,
      stepNumber,
      summary,
      learn,
      handsOn,
      difficulty,
      estimatedTime,
      resources
    }`
  )
}