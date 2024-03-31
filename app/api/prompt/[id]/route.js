import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

//Get route
export const GET = async (request,{params}) => {
    try {
        await connectToDB();
//. or , params check 
        const prompt = await Prompt.findById({params,id}).populate('creator');
        if(!prompt) return new Response("Prompt not Found",{status:404});
    
        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal server error", { status: 500 });
    }
}

//patch route
export const PATCH=async(request,{params})=>{
    const {prompt ,tag}= await request.json();

    try{
        await connectToDB();

        const existingPrompt =await Prompt.findById(params.id);
        if(!existingPrompt){
             return new Response("Prompt not found", {status :404});
        }
      //updating prompt with new data

        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;

        await existingPrompt.save();   
        
        return new Response("Successfully update the Prompts",{status:200})

    }catch(error){
        return new Response("Failed to update Prompt",{status :500})
    }
}

//delete route
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it

        await Prompt.findByIdAndDelete(params.id);
        //await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {

        return new Response("Error deleting prompt", { status: 500 });
    }
};