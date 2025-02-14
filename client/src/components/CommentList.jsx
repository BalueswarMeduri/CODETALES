import { getEnv } from '@/helpers/getenv';
import { useFetch } from '@/hooks/usefetch';
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar';
import moment from 'moment';

const CommentList = ({props}) => {
   
    const { data, loading, error } = useFetch(
        `${getEnv("VITE_API_BASE_URL")}/comment/get/${props.blogid}`,
        {
          method: "get",
          credentials: "include",
        }
      );

      
  return (
    <div>
        <h4 className='text-2xl font-bold'>{data && data.comments.length} Comments</h4>
        <div className='mt-5'>
        {data && data.comments.length > 0
            && 
            data.comments.map(comment=>{
                return(
                    <div key={comment._id} className='flex gap-2 '>
                    <div className='flex gap-2 m-3'>
                        <Avatar>
                            <AvatarImage src={comment?.author.avatar}/>
                        </Avatar>
                        <div>
                            <p className='font-blod'>{comment?.author.name}</p>
                            <p>{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                           <div className='pt-2'>
                                {comment?.comment}
                           </div>
                        </div>
                    </div>
                </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default CommentList