"use client";
import React, { useEffect } from "react";

import { Prisma } from "@prisma/client";
import { MapPinnedIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";

import ControlledCheckbox from "@/components/form/ControlledCheckbox";
import ControlledInput from "@/components/form/ControlledInput";
import ControlledSelect from "@/components/form/ControlledSelect";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { required, onlyNumbers, email } from "@/lib/validations";

import { saveOrder } from "./actions";

interface OrderFormProps {
  departments: Array<{
    id: number;
    name: string;
  }>;
  cart?: Prisma.cartGetPayload<{
    include: {
      details: {
        include: {
          product: true;
        };
      };
    };
  }> | null;
}

type FormData = {
  name: string;
  id: string;
  phone: string;
  email: string;
  department: string;
  city: string;
  address: string;
  complement: string;
  notes: string;
  terms: boolean;
};

const OrderForm: React.FC<OrderFormProps> = ({ departments, cart }) => {
  const [state, formAction] = useFormState(saveOrder, null);
  const { toast } = useToast();
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    const { id, terms, ...payload } = data;
    if (cart) {
      const actionSaveOrder = formAction.bind(null, {
        ...payload,
        dni: id,
        cart,
      });
      actionSaveOrder();
    }
  };

  useEffect(() => {
    if (state) {
      toast({
        title: state.message,
        variant: state.error ? "destructive" : "success",
      });

      if (!state.error && state?.order) {
        router.push(`/order/${state?.order?.orderIdentifier}`);
      }
    }
  }, [toast, state, router]);

  return (
    <div className="flex flex-col justify-start gap-4 md:border-r md:pr-4 pt-8 col-span-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Contacto</h2>
        <div className="mb-2">
          <Alert>
            <MapPinnedIcon className="h-4 w-4" />
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              El detalle de su pedido se enviará a su correo electrónico. Luego
              uno de nuestros agentes se comunicará con usted vía Whatsapp para
              coordinar el pago y el envío.
            </AlertDescription>
          </Alert>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ControlledInput
            name="id"
            label="Número de Identificación"
            placeholder="Identificación / Cédula"
            control={control as any}
            rules={{
              ...required(),
              ...onlyNumbers(),
            }}
          />

          <ControlledInput
            name="name"
            label="Nombre y Apellidos"
            type="text"
            placeholder="Nombre y Apellidos"
            control={control as any}
            rules={{
              ...required(),
            }}
          />

          <ControlledInput
            name="phone"
            type="number"
            label="Número de célular"
            placeholder="Celular / Whatsapp"
            control={control as any}
            rules={{
              ...required(),
            }}
          />

          <ControlledInput
            name="email"
            label="Correo Electrónico"
            type="email"
            placeholder="Correo Electrónico"
            control={control as any}
            rules={{
              ...required(),
              ...email(),
            }}
          />
        </div>
        <h2 className="text-2xl font-bold my-4">Domicilio</h2>
        <div className="mb-2">
          <Alert>
            <MapPinnedIcon className="h-4 w-4" />
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>Envíos a todo Colombia.</AlertDescription>
            <AlertDescription>
              Envío gratis por compras superiores a $150.000
            </AlertDescription>
          </Alert>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ControlledSelect
            label="Departamento"
            options={departments}
            name="department"
            control={control as any}
            rules={{
              ...required(),
            }}
          />
          <ControlledInput
            name="city"
            label="Ciudad"
            type="text"
            placeholder="Ciudad"
            control={control as any}
            rules={{
              ...required(),
            }}
          />
          <ControlledInput
            name="address"
            label="Dirección"
            type="text"
            placeholder="Dirección"
            control={control as any}
            rules={{
              ...required(),
            }}
          />
          <ControlledInput
            name="complement"
            label="Complemento"
            type="text"
            placeholder="Complemento"
            control={control as any}
          />
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex-1">
            <Label htmlFor="notes">Notas / Comentarios</Label>
            <Textarea {...register("notes")} />
          </div>
          <div className="flex-1">
            <ControlledCheckbox
              id="terms"
              name="terms"
              control={control as any}
              rules={{
                required: true,
              }}
              className={cn(errors.terms && "border-red-500")}
            >
              <Label
                htmlFor="terms"
                className={cn(errors.terms && "text-red-500")}
              >
                Acepto los{" "}
                <Link href="/terms" className="text-violet-500">
                  términos y condiciones
                </Link>
              </Label>
            </ControlledCheckbox>
          </div>
        </div>

        <Button
          className="text-white w-full mt-4"
          size="xl"
          variant="success"
          disabled={!isValid}
        >
          <FaWhatsapp className="mr-2" />
          Hacer Pedido
        </Button>
      </form>
    </div>
  );
};

export default OrderForm;
