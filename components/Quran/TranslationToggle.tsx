'use client';

interface Props {
  showTransliteration: boolean;
  showTabasaran: boolean;
  onToggleTransliteration: (value: boolean) => void;
  onToggleTabasaran: (value: boolean) => void;
}

export function TranslationToggle({
  showTransliteration,
  showTabasaran,
  onToggleTransliteration,
  onToggleTabasaran,
}: Props) {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4 items-center">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={showTransliteration}
          onChange={(e) => onToggleTransliteration(e.target.checked)}
          className="mr-2 w-4 h-4"
        />
        <span className="text-sm font-medium">Транслитерация</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={showTabasaran}
          onChange={(e) => onToggleTabasaran(e.target.checked)}
          className="mr-2 w-4 h-4"
        />
        <span className="text-sm font-medium">Табасаранский перевод</span>
      </label>
    </div>
  );
}

