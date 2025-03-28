import React from 'react'
import { Post } from '/imports/api/Posts/posts'
import PostCard from './PostCard'

interface DisplayFeedProps {
    posts:Post[]
}

const DisplayFeed = ({posts}:DisplayFeedProps) => {
  return (
    <section className='flex flex-col w-[65%]'>
        <ul className='flex flex-col space-y-7'>
            {posts.map((post , index) => (
                <li key={index}>
                    <PostCard post={post}/>
                </li>
            ))}


        </ul>

    </section>
  )
}

export default DisplayFeed