'use client';
import React, { useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Delete } from 'lucide-react';
import { Id } from '@/convex/_generated/dataModel';
import Image from './Image';

const EditMenu = () => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const allMenuCats = useQuery(api.menu.getAll);
  const addMenuItems = useMutation(api.menu.create);
  const deleteMenuItems = useMutation(api.menu.deleteMenu);
  const deleteMenuByDate = useMutation(api.menu.deleteMenuByDate);

  const date = new Date();
  const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const imageUpload = useRef<HTMLInputElement>(null);
  // const [selectImage, setSelectImage] = useState<File | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  async function displayItem() {
    if (item.trim() !== '' && price.trim() !== '') {
      await addMenuItems({ item, price: parseFloat(price), date: currentDate });
      setItem('');
      setPrice('');
    }
  }

  async function todayMenuDelete() {
    await deleteMenuByDate();
  }

  async function handleDelete(_id: Id<'menu'>) {
    await deleteMenuItems({ _id });
  }

  const handleUploadComplete = () => {
    setUploaded(true);
    setTimeout(() => setUploaded(false), 3000);
  };

  return (
    <div className="min-h-screen text-gray-800 bg-gray-100 px-4 sm:px-8 flex flex-col lg:flex-row">
      {/* Left Side - Menu Management */}
      <div className="w-full lg:w-1/2 p-4">
        <div className="flex justify-center py-6">
          <h2 className="font-bold text-2xl text-center">Menu for {currentDate}</h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
            <Input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Enter menu item"
              className="w-full sm:w-1/2 px-4 py-2 rounded-lg shadow-md border"
            />
            <Input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Set Price"
              className="w-full sm:w-1/2 px-4 py-2 rounded-lg shadow-md border"
            />
            <Button
              onClick={displayItem}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600"
            >
              Add
            </Button>
          </div>
          {allMenuCats && allMenuCats.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="py-3 px-6 text-left">Item</th>
                    <th className="py-3 px-6 text-left">Price</th>
                    <th>
                      <Button onClick={todayMenuDelete} className="bg-orange-500 hover:bg-red-500">
                        Delete All <Delete />
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allMenuCats.map((menu, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                      <td className="py-3 px-6">{menu.item}</td>
                      <td className="py-3 px-6">₹{menu.price}</td>
                      <td>
                        <Button onClick={() => handleDelete(menu._id)} className="bg-orange-50 hover:bg-orange-300">
                          <Delete className="h-4 w-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-600 py-6">Not Available for today</div>
          )}
        </div>
      </div>
      
      {/* Right Side - Image Upload */}
      <div className="w-full lg:w-1/2 p-4 flex flex-col items-center justify-center border-t lg:border-l lg:border-t-0">
        <h2 className="font-bold text-2xl text-center mb-4">Upload an Image</h2>
        <Image />
        <Button className={`mt-4 px-6 py-2 rounded-lg shadow-md ${uploaded ? 'bg-green-500' : 'bg-blue-500'}`}>
          {uploaded ? 'Uploaded' : 'Upload'}
        </Button>
      </div>
    </div>
  );
};

export default EditMenu;
