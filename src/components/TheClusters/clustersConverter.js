export const clustersConverter = (data, FIELD_WIDTH, FIELD_HEIGHT) => {
  const FIElD_SQUARE = FIELD_WIDTH * FIELD_HEIGHT
  const RATIO_BETWEEN_LARGEST_AND_SMALLEST = 4
  const COEFFICIENT_OF_FILL = 0.45

  function getAvailablePixels(pixels, elSize) {
    return pixels.filter((pixel) => {
      const halfWidth = Math.ceil(elSize / 2)

      // Проверяем недоступные ряды наверху и внизу
      const row = Math.floor(pixel / FIELD_WIDTH)
      if (row < halfWidth || row > FIELD_HEIGHT - halfWidth) return false

      // Проверяем недоступные ряды слева и справа
      const column = pixel % FIELD_WIDTH
      if (column < halfWidth || column > FIELD_WIDTH - halfWidth) return false

      return true
    })
  }

  function subtractPixels(pixels, position, elSize, nextElSize) {
    // Половина элемента с суммой половины следующего элемента
    const halfWidth = Math.floor(elSize / 2 + (nextElSize ? nextElSize / 2 : 0))

    // Находим координаты
    const x = position % FIELD_WIDTH
    const y = Math.floor(position / FIELD_WIDTH)

    // Удаляем занятые пиксели
    return pixels.filter((pixel) => {
      const row = Math.floor(pixel / FIELD_WIDTH)

      if (row >= y - halfWidth && row <= y + halfWidth) {
        return (
          pixel < row * FIELD_WIDTH + x - halfWidth || pixel > row * FIELD_WIDTH + x + halfWidth
        )
      }

      return true
    })
  }

  // Сортируем кластеры по размерам
  let clusters = data.clusters.sort((a, b) => {
    if (a.cluster_size < b.cluster_size) return -1
    if (a.cluster_size > b.cluster_size) return 1
    return 0
  })

  // Получаем размер самого большого кластера
  let lastSize = clusters[clusters.length - 1].cluster_size

  // Приводим соотношение размеров к нормальным для отрисовки и переворачиваем массив
  clusters = clusters
    .map((cluster) => ({
      ...cluster,
      size: (cluster.cluster_size / lastSize) * (RATIO_BETWEEN_LARGEST_AND_SMALLEST - 1) + 1
    }))
    .reverse()

  // Находим площадь всех кластеров
  const sumOfSquares = clusters.reduce((acc, curr) => acc + curr.size ** 2, 0)

  // Вычисляем размер кластеров на экране
  clusters = clusters.map((cluster) => ({
    ...cluster,
    elementSize: Math.floor(
      cluster.size * Math.sqrt(FIElD_SQUARE / sumOfSquares) * COEFFICIENT_OF_FILL
    )
  }))

  // Генерируем массив со всеми пикселями в поле
  let pixels = Array.from(Array(FIElD_SQUARE).keys())

  clusters.forEach((cluster, index) => {
    // Ищем доступное пространство для элемента
    const availablePixels = getAvailablePixels(pixels, cluster.elementSize)

    // Рандомизируем расположение
    const position = availablePixels[Math.floor(Math.random() * availablePixels.length)]

    // Добавляем координаты
    clusters[index].x = position % FIELD_WIDTH
    clusters[index].y = Math.floor(position / FIELD_WIDTH)

    if (index === cluster.length - 1) return

    // Вычитаем размещенный объект из пикселей
    pixels = subtractPixels(pixels, position, cluster.elementSize, clusters[index + 1]?.elementSize)
  })

  return clusters
}
