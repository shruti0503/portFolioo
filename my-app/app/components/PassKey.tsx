'use client'
import React from 'react'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { decryptKey } from '../lib/utils'
import { encryptKey } from '../lib/utils'
import Loader from '@/components/ui/Loader'
import Image from 'next/image'
import { validatePassKey } from '../lib/actions/admin.actions'
// import { ADMIN_PASSKEY } from '../lib/actions/admin.actions'
import { Terminal } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const PassKeyModel = ({ isAdmin }: any) => {

  console.log("inside passkey")

  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");


  const closeModal = () => {
    setOpen(false);
    router.push("/")
  }

  useEffect(() => {
    if (isAdmin) {

      setOpen(true)

    }
    else {
      setOpen(false)
    }


  }, [isAdmin])

  const encryptedKey = typeof window !== "undefined" ?
    window.localStorage.getItem("accessKey") :
    null;

  useEffect(() => {
    const checkKey = async () => {
      const accessKey = encryptedKey ? decryptKey(encryptedKey) : null;
      if (accessKey) {
        const isValid = await validatePassKey(accessKey);
        if (isValid) {
          setOpen(false);
          router.push("/admin");
        } else {
          setOpen(true);
        }
      } else {
        setOpen(true);
      }
    };

    if (path) {
      checkKey();
    }
  }, [encryptedKey, path, router])



  const validatePasskey = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLoading(true);
    const isValid = await validatePassKey(passkey);
    
    if (isValid) {
      const encrypted = encryptKey(passkey);
      localStorage.setItem("accessKey", encrypted);
      setOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passKey.Please try again!");
    }
    setLoading(false);
  }

  return (

    <AlertDialog open={open} onOpenChange={setOpen} >
      <AlertDialogContent className='shad-alert-dialog'>
        {
          loading ? <Loader /> :
            <>
              <AlertDialogHeader>
                <AlertDialogTitle className='flex items-start justify-between'>
                  Admin Access Vertification
                  <Image
                    src="/close.svg"
                    alt="close"
                    width={20}
                    height={20}
                    onClick={() => closeModal()}
                    className='cursor-pointer'
                  />
                </AlertDialogTitle>

                <AlertDialogDescription>
                  To access the admin page, please enter the passkey
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className='flex justify-center'>
                <InputOTP
                  maxLength={7}
                  value={passkey}
                  onChange={(value) => setPasskey(value)}
                >
                  <InputOTPGroup className="shad-otp">
                    <InputOTPSlot className="shad-otp-slot" index={0} />
                    <InputOTPSlot className="shad-otp-slot" index={1} />
                    <InputOTPSlot className="shad-otp-slot" index={2} />
                    <InputOTPSlot className="shad-otp-slot" index={3} />
                    <InputOTPSlot className="shad-otp-slot" index={4} />
                    <InputOTPSlot className="shad-otp-slot" index={5} />
                    <InputOTPSlot className="shad-otp-slot" index={6} />
                  </InputOTPGroup>
                </InputOTP>



                {
                  error && (
                    <p className="shad-error text-14-regular mt-4 flex justify-center">
                      {error}
                    </p>
                  )
                }
              </div>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={(e) => validatePasskey(e)}
                  className="shad-primary-btn w-full"
                >
                  Enter Admin Passkey
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
        }



      </AlertDialogContent>





    </AlertDialog>
  )
}

export default PassKeyModel