import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getMenuByDate = query({
  args: {
    date: v.string(), 
  },
  handler: async (ctx, args) => {
 
    const getMenuByDate = await ctx.db.query("menu").filter(q => q.eq(q.field("date"), args.date)).collect();
    return getMenuByDate;
  }
});

export const getAll=query({
  args:{},handler:async(ctx,args)=>{
    return await ctx.db.query('menu').collect()
  }
})
export const create = mutation({
  args: {
    item: v.string(),
    price: v.number(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    
    await ctx.db.insert("menu", {
      item: args.item,
      price: args.price,
      date: args.date,
    });
  }
});
export const deleteMenu = mutation({
  args: { _id: v.id("menu") },  
  handler: async (ctx, { _id }) => {
    await ctx.db.delete(_id);
  },
});
export const deleteMenuByDate=mutation(async({db})=>{
    const date=new Date();
    const today=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const menuToday=await db.query("menu").filter((q)=>q.eq(q.field("date"),today)).collect()
    for (const menu of menuToday)
    {
      await db.delete(menu._id)
    }
})