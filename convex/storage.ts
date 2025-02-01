import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
export const getUrl=query({
  args:{storageId:v.id("_storage")},
  handler:async(ctx,{storageId})=>{
    return await ctx.storage.getUrl(storageId)
  }
})
export const latestMenu=query({
  args:{},
  handler:async(ctx)=>{
    const latesImage=await ctx.db.query("image").order("desc").first()
    return latesImage||null
  }
})
export const getImageByDate=query({
 args:{storageId:v.id("_storage")},
 handler:async(ctx,args)=>{
  const date=new Date(Date.now())
  const day=date.getDate();
  const month=date.getMonth()+1;
  const year=date.getFullYear()
  const today=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

 }
})
export const saveImage = mutation({
  args: { storageId: v.id("_storage")},
  handler: async (ctx, { storageId}) => {
    return await ctx.db.insert("image", {storageId});
  },
});
export const deletImage=mutation({
  args:{storageId:v.id("_storage")},
  handler:async(ctx,{storageId})=>{
    await ctx.storage.delete(storageId)
  }
})