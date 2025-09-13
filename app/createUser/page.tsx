"use client"
import React from 'react'
import { Navigation } from '@/components/navigation'
import Form from '@/components/form'
const Page = () => {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 ">
        <Navigation />
        <main className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 shadow-xl rounded-2xl p-8 border border-slate-200">
            <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">
              Create User
            </h1>
            <Form />
          </div>
        </main>
      </div>
    )
  }
  
  export default Page