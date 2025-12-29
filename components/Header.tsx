export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-1 py-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-black">
              Коран на табасаранском языке
            </h1>
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            Переводчик: <span className="font-semibold text-black">Альберт Гаджикаибов</span>
          </div>
        </div>
      </div>
    </header>
  );
}

