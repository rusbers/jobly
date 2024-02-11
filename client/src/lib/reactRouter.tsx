import { ReactNode } from 'react'
import {
  AwaitProps as AwaitPropsReactRouter,
  Await as AwaitReactRouter,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from 'react-router-dom'

export function defferedLoader<T extends Record<string, unknown>>(
  dataFunc: (args: LoaderFunctionArgs) => T
) {
  return (args: LoaderFunctionArgs) => {
    return defer(dataFunc(args)) as Omit<ReturnType<typeof defer>, 'data'> & { data: T }
  }
}

export function useDefferedLoaderData<T extends ReturnType<typeof defferedLoader>>() {
  return useLoaderData() as ReturnType<T>['data']
}

type AwaitProps<T> = Omit<AwaitPropsReactRouter, 'children' | 'resolve'> & {
  children: (data: Awaited<T>) => ReactNode
  resolve: Promise<T>
}

export function Await<T>(props: AwaitProps<T>) {
  return <AwaitReactRouter {...props} />
}
