import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { z } from 'zod'

const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  url: z.string().url().optional(),
})

const formSchema = z.object({
  user: z.string().min(4),
  tasks: z.array(taskSchema).min(1),
})

type TypeFormSchema = z.infer<typeof formSchema>

export function ArrayFieldForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<TypeFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: '',
      tasks: [{ description: '', title: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'tasks',
    control: form.control,
  })

  function onSubmit(data: TypeFormSchema) {
    console.log(data)
    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      toast({
        title: 'Você submeteu os dados:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }, 1500)
  }
  const handleRemoveFields = (index: number) => {
    remove(index)
  }

  const handleAddFields = () => {
    append({ description: '', title: '' })
  }

  return (
    <div className="flex justify-center mt-12">
      <Card className="w-[800px] ">
        <CardHeader>
          <CardTitle>Formulário de tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>User</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Informe o nome do usuário..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />

              {fields.map((item, index) => (
                <div key={item.id} className="flex gap-2">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name={`tasks.${index}.title`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Título</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="Informe o título da tarefa..."
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                    <FormField
                      control={form.control}
                      name={`tasks.${index}.description`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="Descreva a tarefa..."
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                    <FormField
                      control={form.control}
                      name={`tasks.${index}.url`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Link</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="Adicione um link..."
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                  {index !== 0 && (
                    <div className="flex items-center justify-center">
                      <Button
                        variant="destructive"
                        type="button"
                        size="xs"
                        onClick={() => handleRemoveFields(index)}
                      >
                        <X size={20}></X>
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleAddFields}
                  disabled={loading}
                >
                  Nova Task
                </Button>

                <Button type="submit" disabled={loading}>
                  Adicionar tasks
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
