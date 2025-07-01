'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function SortFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      <label htmlFor="sort" className="mr-2 text-sm text-gray-700">Sırala:</label>
      <select
        id="sort"
        className="border border-gray-300 px-3 py-2 text-sm rounded"
        onChange={handleChange}
        defaultValue={searchParams.get('sort') || ''}
      >
        <option value="">Varsayılan</option>
        <option value="price-asc">Fiyat: Artan</option>
        <option value="price-desc">Fiyat: Azalan</option>
        <option value="newest">Son Eklenen</option>
      </select>
    </div>
  )
}
