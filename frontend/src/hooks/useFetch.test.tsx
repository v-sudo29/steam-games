import { renderHook, act } from "@testing-library/react";
import useFetch from "./useFetch";

describe('useFetch', () => {
  test('should render initial response as null', () => {
    const { result } = renderHook(useFetch)
    expect(result.current.response).toBeNull()
  })

  test('should render initial error as null', () => {
    const { result } = renderHook(useFetch)
    expect(result.current.error).toBeNull()
  })

  test('should render isLoading to be true', () => {
    const { result } = renderHook(useFetch)
    expect(result.current.isLoading).toBeTruthy()
  })
})