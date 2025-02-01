import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const getAllOrders=query({
  args:{},
  handler:async(ctx,args)=>{
    return await ctx.db.query("orders").order('asc').collect()
  }
})
export const createOrder=mutation({
  args:{
    name:v.string(),
    date:v.string(),
    items:v.string(),
    numberOfPeople:v.number(),
    floor:v.number(),
    department:v.string(),
    phoneNumber:v.string()

  },
  handler:async(ctx,args)=>{
     const orderId=await ctx.db.insert("orders",{
      name:args.name,
      date:args.date,
      items:args.items,
      numberOfPeople:args.numberOfPeople,
      floor:args.floor,
      department:args.department,
      phoneNumber:args.phoneNumber

     })
     return orderId
  }
})