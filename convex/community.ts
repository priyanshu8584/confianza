import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const community=mutation({
  args:{
    userId:v.string(),
    name:v.string(),
    suggestions:v.string()
  },
  handler:async(ctx,args)=>{
      return await ctx.db.insert("community",{
        userId:args.userId,
        name:args.name,
        suggestions:args.suggestions
      })
  }
})
export const getAllCommunity=query({
  handler:async(ctx)=>{
    return await ctx.db.query("community").order("desc").collect()
  }
})