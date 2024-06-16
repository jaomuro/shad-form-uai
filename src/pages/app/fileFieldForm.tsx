import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
  'image/svg+xml',
  'application/pdf',
  'application/vnd.jgraph.mxfile',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
]

const formSchema = z.object({
  description: z
    .string()
    .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' })
    .refine((text) => !text.includes('.'), {
      message: 'Não pode haver o caractere "." no nome do arquivo',
    })
    .transform((text) => text.toUpperCase()),
  file: z
    .instanceof(File)
    .refine((file) => !!file && file.size <= 20 * 1024 * 1024, {
      message: `O arquivo pode ter no máximo ${20}MB.`,
    })
    .refine(
      (file) => {
        return !!file && ALLOWED_IMAGE_TYPES.includes(file.type)
      },
      {
        message: 'Extensões aceitas .jpeg .jpg .png .sgv .drawio .xls .doc',
      },
    )
    .refine((file) => !!file && file.size > 512, {
      message: 'O arquivo precisa ter pelo menos 500 bytes',
    }),
})

export type AttachementForm = z.infer<typeof formSchema>

export function FileFieldForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<AttachementForm>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      description: '',
      file: new File([], ''),
    },
  })
  function cleaningForm() {
    form.reset()
    form.setValue('file', new File([], ''))
  }

  function onSubmit(data: AttachementForm) {
    console.log(data)

    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      toast({
        title: 'Você submeteu os dados:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            <p>Verifique o arquivo no console do navegador</p>
          </pre>
        ),
      })
    }, 800)

    cleaningForm()
  }

  return (
    <div className="flex justify-center mt-12">
      <Card className="w-[800px] ">
        <CardHeader>
          <CardTitle>Formulário de tasks</CardTitle>
          <CardDescription>
            O campo arquivo é o input usando type file, o onchange padrão do
            input não consegue tratar o tipo FileList que é o nativo, necessário
            fazer um onchange manualmente, passando o primeiro arquivo para o
            estado do form, toda a validação do arquivo deve ser feita pelo zod,
            é mais simples dessa maneira.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Informe o nome do anexo..."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange } }) => {
                  return (
                    <FormItem>
                      <FormLabel>Arquivo</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          className="file:text-primary cursor-pointer"
                          placeholder="Adicione um anexo"
                          disabled={form.formState.isSubmitting}
                          onChange={(event) => {
                            onChange(
                              event.target.files && event.target.files[0],
                            )
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <div className="flex gap-2 ml-auto">
                <Button variant="secondary" type="button" disabled={loading}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  Criar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
