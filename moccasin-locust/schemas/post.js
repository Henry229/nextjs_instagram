export default {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Photo',
      name: 'photo',
      type: 'image',
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Comments',
      name: 'comments',
      type: 'document',
      fields: [
        {
          title: 'Author',
          name: 'author',
          type: 'reference',
          to: [{type: 'user'}],
        },
        {
          title: 'Comment',
          name: 'comment',
          type: 'string',
        },
      ],
    },
  ],
}
