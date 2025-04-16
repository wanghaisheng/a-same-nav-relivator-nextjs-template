"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../primitives/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../primitives/form";
import { Input } from "../../primitives/input";
import { Textarea } from "../../primitives/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../primitives/select";
import { Checkbox } from "../../primitives/checkbox";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tool name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  price: z.coerce.number().min(0, {
    message: "Price must be a positive number.",
  }),
  tags: z.string().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function SubmitToolForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      category: "",
      price: 0,
      tags: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setPaymentStatus("processing");
    try {
      // TODO: 替换为真实后端API调用
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPaymentStatus("success");
      router.push("/thanks");
    } catch (e) {
      setPaymentStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tool Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter tool name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your tool" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Official Website</FormLabel>
              <FormControl>
                <Input placeholder="https://" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="app">App</SelectItem>
                    <SelectItem value="tool">Tool</SelectItem>
                    <SelectItem value="game">Game</SelectItem>
                    <SelectItem value="ebook">Ebook</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Comma separated tags" {...field} />
              </FormControl>
              <FormDescription>Optional, e.g. AI, productivity, free</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>I accept the terms and conditions</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting || paymentStatus === "processing"} className="w-full">
          {isSubmitting || paymentStatus === "processing" ? (
            <LoadingSpinner className="mr-2 h-4 w-4" />
          ) : null}
          Submit Tool
        </Button>
        {paymentStatus === "error" && <div className="text-red-500 text-sm">提交失败，请稍后重试。</div>}
      </form>
    </Form>
  );
}
