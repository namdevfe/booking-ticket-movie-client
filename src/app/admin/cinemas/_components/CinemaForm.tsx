"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CreateCinemaPayload } from "@/types/cinema-type";
import { createCinemaSchema } from "@/validations/cinema-validation";
import { Ban, Save } from "lucide-react";
import cinemaService from "@/services/cinema-service";
import Image from "next/image";


const CinemaForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreateCinemaPayload>({
    defaultValues: {
      name: "",
      address: "",
      coverImage: "",
      description: "",
      images: [],
      phoneNumber: "",
      position: null,
    },
    resolver: zodResolver(createCinemaSchema)
  });

  const onSubmit = async (data: CreateCinemaPayload) => {
    setIsLoading(true);
    try {
      const payload: CreateCinemaPayload = { ...data } 

      const res = await cinemaService.createCinema(payload)

      if (res.data && res.data._id) {
        toast({
          title: "Success",
          description: res.message ?? 'Thêm mới rạp thành công',
        })

        form.reset()
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 max-h-[calc(100vh-200px)] overflow-y-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cinema Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter cinema name" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={isLoading}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter cinema address" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={isLoading}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={isLoading}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter cinema description" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              disabled={isLoading}
              name="coverImage"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="w-full"
                      onChange={(e) => {
                        // Simulate file upload
                        const mockUrl = e.target.files?.[0]
                          ? URL.createObjectURL(e.target.files[0])
                          : "";
                        field.onChange(mockUrl);
                      }}
                    />
                  </FormControl>
                  {field.value && (
                    <div className="mt-2">
                      <Image
                        src={field.value}
                        alt="Cover preview"
                        className="h-32 w-auto rounded-md object-cover"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={isLoading}
              name="images"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Additional Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      className="w-full"
                      onChange={(e) => {
                        // Simulate multiple file uploads
                        const files = Array.from(e.target.files || []);
                        const urls = files.map((file) => URL.createObjectURL(file));
                        field.onChange(urls);
                      }}
                    />
                  </FormControl>
                  {field.value && field.value.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {field.value.map((url, index) => (
                        <Image
                          key={index}
                          src={url}
                          alt={`Additional image ${index + 1}`}
                          className="h-24 w-auto rounded-md object-cover"
                        />
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-6">
              <FormField
                control={form.control}
                disabled={isLoading}
                name="position.latitude"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.000001"
                        placeholder="Enter latitude"
                        className="w-full"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                disabled={isLoading}
                name="position.longtitude"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.000001"
                        placeholder="Enter longitude"
                        className="w-full"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button variant='outline' disabled={isLoading}>
            <Ban />
            <span>Hủy</span>
          </Button>
          <Button disabled={isLoading}>
            <Save />
            <span>Lưu</span>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CinemaForm