import { useModal } from 'react-modal-pop';

const ModalBody = ({ close }: { close: any }) => {
  return (
    <>
      <h1>Body</h1>
      <div>
        <button onClick={() => close({ status: 'ok' })}>Ok</button>
      </div>
    </>
  )
}

function App() {
  const { show } = useModal();

  const onShow = async () => {
    const result = await show(ModalBody)
    console.log(result);
  }

  return (
    <div className="App d-flex vh-100 w-100 justify-content-center align-items-center">

      <button className='btn btn-primary mx-1' onClick={() => onShow()}>
        Launch Modal
      </button>
    </div>
  );
}

export default App;
