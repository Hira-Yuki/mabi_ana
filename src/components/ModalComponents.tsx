import Modal from 'react-modal';

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 10,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "480px",
    maxHeight: "70vh",
    padding: "0",
    borderRadius: "8px",
    backgroundColor: "transparent",
    boxShadow: "none",
    overflowY: "auto",
    position: "relative",
  },
};

interface ModalContentItem {
  option_type: string;
  option_value: string;
  option_value2?: string;
  option_sub_type?: string;
  option_desc?: string;
}

interface ModalComponentsProps {
  modalContents: ModalContentItem[];
  isOpen: boolean;
  close: () => void;
}

// 필터링할 옵션 타입들
const groupedOptions = ["공격", "부상률", "크리티컬", "내구력", "밸런스", "피어싱 레벨", "숙련"];
const reforgeOptions = ["세공 랭크", "세공 옵션"];
const enchantOptions = ["인챈트"];
const setOptions = ["세트 효과"];
const itemColorOptions = ["아이템 색상"];
const modificationOptions = ["일반 개조", "보석 개조", "특별 개조"];


export default function ModalComponents({ modalContents, isOpen, close }: ModalComponentsProps) {
  // 성능을 조건에 따라 표시하는 함수
  const renderPerformance = (item: ModalContentItem) => {
    switch (item.option_type) {
      case "공격":
      case "부상률":
        return `${item.option_value}${item.option_value2 ? ` ~ ${item.option_value2}` : ''}`;
      case "크리티컬":
      case "밸런스":
        return `${item.option_value}`;
      case "내구력":
        return `${item.option_value} / ${item.option_value2}`;
      case "피어싱 레벨":
        return `${item.option_value}${item.option_value2 ? ` (${item.option_value2})` : ''}`;
      case "에르그":
        return `${item.option_value} / ${item.option_value2}`;
      default:
        return `${item.option_value}${item.option_value2 ? ` ~ ${item.option_value2}` : ''}`;
    }
  };

  // 색상 표시 함수
  const renderColorBox = (rgbValue: string) => {
    const rgbArray = rgbValue.split(',').map(Number); // RGB 값을 배열로 변환
    const colorStyle = {
      backgroundColor: `rgb(${rgbArray.join(',')})`,
    };

    return (
      <div className="flex items-center space-x-2">
        <div
          className="w-6 h-6 border border-gray-300"
          style={colorStyle}
        />
        <span>{rgbValue}</span>
      </div>
    );
  };

  // 박스에서 그룹화하여 한 번에 표시할 성능 옵션들
  const renderGroupedPerformance = (contents: ModalContentItem[]) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">아이템 성능</h3>
        {contents?.map((item, index) => (
          <div key={index} className="text-sm text-gray-700 mb-1">
            {item.option_type}: {renderPerformance(item)}
          </div>
        ))}
      </div>
    );
  };

  // 세공 랭크 및 세공 옵션을 한 카드로 묶어서 표시
  const renderReforgeOptions = (contents: ModalContentItem[]) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">세공</h3>
        {contents?.map((item, index) => (
          <div key={index} className="text-sm text-gray-700 mb-1">
            {item.option_type === "세공 랭크"
              ? `랭크: ${item.option_value}`
              : `옵션 ${item.option_sub_type}: ${item.option_value}`}
          </div>
        ))}
      </div>
    );
  };

  // 인챈트 설명을 줄바꿈 처리하는 함수
  const renderEnchantmentDescription = (desc: string) => {
    return desc.split(',')?.map((line, index) => (
      <div key={index} className="block text-blue-600">
        {line.trim()}
      </div>
    ));
  };

  // 인챈트를 한 카드로 묶어서 표시
  const renderEnchantOptions = (contents: ModalContentItem[]) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">인챈트</h3>
        {contents?.map((item, index) => (
          <div key={index} className="text-sm text-gray-700 mb-1">
            {item.option_sub_type}: {item.option_value}
            {item.option_desc && (
              <div className="text-xs text-gray-500 italic mt-1">
                {renderEnchantmentDescription(item.option_desc)} {/* 쉼표마다 줄바꿈 */}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // 세트 효과를 한 카드로 묶어서 표시
  const renderSetOptions = (contents: ModalContentItem[]) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">세트 효과</h3>
        {contents?.map((item, index) => (
          <div key={index} className="text-sm text-gray-700 mb-1">
            {item.option_value} : {item.option_value2}
          </div>
        ))}
      </div>
    );
  }

  // 아이템 색상을 한 카드로 묶어서 표시
  const renderItemColorOptions = (contents: ModalContentItem[]) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">아이템 색상</h3>
        {contents?.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mb-1">
            <span className="text-xs text-gray-500"> {item.option_sub_type}</span>
            {renderColorBox(item.option_value)}
          </div>
        ))}
      </div>
    );
  }

  // 개조 옵션을 한 카드로 묶어서 표시
  const renderModificationOptions = (contents: ModalContentItem[]) => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm mb-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">개조</h3>
        {contents?.map((item, index) => (
          <div key={index} className="text-sm text-gray-700 mb-1">
            {item.option_type}: {item.option_value}
            <span className="text-xs text-gray-500"> {item.option_sub_type !== null && `(${item.option_sub_type})`}</span>
            {item.option_value2 && ` / ${item.option_value2}`}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      style={customModalStyles}
      ariaHideApp={false}
      contentLabel="Pop up Message"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 relative">
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ✖
        </button>

        {modalContents ? (
          <div className="p-3">
            <h2 className="mb-3 text-lg font-semibold text-center text-gray-800">아이템 옵션</h2>

            {/* 한 박스에 표시할 성능 옵션들 그룹화 */}
            {renderGroupedPerformance(
              modalContents.filter(item => groupedOptions.includes(item.option_type))
            )}

            {/* 개조 옵션을 그룹화 */}
            {renderModificationOptions(
              modalContents.filter(item => modificationOptions.includes(item.option_type))
            )}

            {/* 인챈트 옵션 그룹화 */}
            {renderEnchantOptions(
              modalContents.filter(item => enchantOptions.includes(item.option_type))
            )}

            {/* 세공 랭크와 세공 옵션 그룹화 */}
            {renderReforgeOptions(
              modalContents.filter(item => reforgeOptions.includes(item.option_type))
            )}

            {/* 세트 옵션을 그룹화 */}
            {renderSetOptions(
              modalContents.filter(item => setOptions.includes(item.option_type))
            )}

            {/* 아이템 색상을 그룹화 */}
            {renderItemColorOptions(
              modalContents.filter(item => itemColorOptions.includes(item.option_type))
            )}



            <div className="grid grid-cols-1 gap-2">
              {modalContents
                .filter(item => !groupedOptions.includes(item.option_type) &&
                  !reforgeOptions.includes(item.option_type) &&
                  !enchantOptions.includes(item.option_type) &&
                  !setOptions.includes(item.option_type) &&
                  !itemColorOptions.includes(item.option_type) &&
                  !modificationOptions.includes(item.option_type)
                )
                ?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
                  >
                    <div className="mb-1 text-base font-semibold text-gray-800">
                      {item.option_type}
                      {item.option_sub_type && (
                        <span className="text-xs text-gray-500"> ({item.option_sub_type})</span>
                      )}
                    </div>

                    <div className="mb-1 text-sm text-gray-700">
                      {/* 성능을 조건에 맞게 출력 */}
                      {item.option_type === "아이템 색상"
                        ? renderColorBox(item.option_value) // 색상인 경우 색상 상자 출력
                        : `${renderPerformance(item)}`
                      }
                    </div>

                    {item.option_desc && (
                      <div className="text-xs text-gray-500 italic">
                        설명: {item.option_desc}
                      </div>
                    )}
                  </div>
                ))}
            </div>

          </div>
        ) : (
          <p className="text-center text-sm text-gray-500">데이터가 없습니다.</p>
        )}
      </div>
    </Modal>
  );
}
