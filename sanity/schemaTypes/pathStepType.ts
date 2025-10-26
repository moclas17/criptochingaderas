import { defineType, defineField } from 'sanity'

export const pathStepType = defineType({
  name: 'pathStep',
  title: 'Paso del Camino Web2→Web3',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stepNumber',
      title: 'Número del paso',
      type: 'number',
      validation: (rule) => rule.required().min(0).max(20),
    }),
    defineField({
      name: 'summary',
      title: 'Resumen',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'learn',
      title: 'Qué aprender',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'handsOn',
      title: 'Práctica hands-on',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'difficulty',
      title: 'Dificultad',
      type: 'string',
      options: {
        list: [
          { title: 'Principiante', value: 'beginner' },
          { title: 'Intermedio', value: 'intermediate' },
          { title: 'Avanzado', value: 'advanced' },
        ],
        layout: 'radio',
      },
      initialValue: 'beginner',
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Tiempo estimado (horas)',
      type: 'number',
      validation: (rule) => rule.min(1).max(100),
    }),
    defineField({
      name: 'resources',
      title: 'Recursos adicionales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'url', type: 'url', title: 'URL' },
            { name: 'type', type: 'string', title: 'Tipo', options: {
              list: ['tutorial', 'documentation', 'tool', 'course', 'article']
            }}
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      stepNumber: 'stepNumber',
      summary: 'summary',
    },
    prepare({ title, stepNumber, summary }) {
      return {
        title: `${stepNumber}. ${title}`,
        subtitle: summary,
      }
    },
  },
  orderings: [
    {
      title: 'Número del paso',
      name: 'stepNumberAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }],
    },
  ],
})