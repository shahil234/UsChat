import React from 'react';
import dummpyProfile from "../../../public/user.png"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { SquarePlus } from 'lucide-react';
import { usePopUp } from '../../store/usePopUp';
import { PopUps } from '../../lib/helper';


const PostUploader = () => {
    const { setCurrentPopUp } = usePopUp();
  return (
    <div className='max-w-80 mx-auto flex gap-2 items-center'>
        <div className='flex items-center gap-2'>
            <div>
                <img src={dummpyProfile} className='w-12' alt="" />
            </div>
            <div>
                <Input type="text" className="bg-gray-100 rounded-2xl px-4 py-2" placeholder="What's on your mind?" />
            </div>
        </div>
        <div>
            <div className='flex justify-center'>
                <Button onClick={() => setCurrentPopUp(PopUps.postUploadPopUp)} variant="secondary">
                    <SquarePlus className='text-green-500' />
                    <span>Post</span>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default PostUploader