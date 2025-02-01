import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser=mutation({
  args:{
    userId:v.string(),
    name:v.string(),
    email:v.string(),
    isAdmin:v.boolean()
  },
  handler:async (ctx,{userId,name,email,isAdmin})=>{
const existingUser=await ctx.db.query("users").filter((q)=>q.eq("userId",userId)).first()
if(existingUser)
{
  return;
}

       const newUser=await ctx.db.insert("users",{
    name,
    userId,
    email,
    isAdmin
       })
       return newUser
  }
})