import React, { useState } from 'react';
import { Screen, Account } from './types';
import { ACCOUNTS, RECENT_TRANSACTIONS } from './constants';
import { Layout } from './components/Layout';
import { LoginScreen, VerifyIdentityScreen, FaceIDSetup, ConfirmDataScreen, CreatePasswordScreen, VerificationSuccessScreen } from './screens/Auth';
import { HomeScreen } from './screens/Home';
import { OperationsScreen } from './screens/Operations';
import { ProfileScreen } from './screens/Profile';
import { ForYouScreen } from './screens/ForYou';
import { ProductDetailScreen } from './screens/ProductDetail';
import { TransferSelect, TransferAmount, TransferConfirm, TransferSuccess } from './screens/flows/TransferFlow';
import { ExchangeScreen, ExchangeConfirm, ExchangeSuccess } from './screens/flows/ExchangeFlow';
import { CardPaymentSelect, CardPaymentAmount, CardPaymentSource, CardPaymentConfirm, CardPaymentSuccess } from './screens/flows/CardPaymentFlow';
import { LoanSimulator, LoanReview, LoanTerms, LoanSuccess } from './screens/flows/LoanFlow';
import { GoalsList, GoalsCreateCategory, GoalsCreateDetails, GoalsSuccess, GoalDetail } from './screens/flows/GoalsFlow';
import { ServicesSelect, ServicesDetails, ServicesDebt, ServicesConfirm, ServicesSuccess } from './screens/flows/ServicesFlow';
import { QRScan, QRAmount, QRConfirm, QRSuccess } from './screens/flows/QRFlow';
import { StatementSelectProduct, StatementSelectPeriod, StatementDeliveryMethod, StatementSuccess } from './screens/flows/StatementFlow';
import { ProfileEdit, ProfileSecurity, ProfileHelp, ProfileCardSettings, ProfileLocations } from './screens/flows/ProfileFlow';
import { NotificationsScreen } from './screens/Notifications';
import { AllTransactionsScreen } from './screens/AllTransactions';
import { TransactionDetailScreen } from './screens/TransactionDetail';
import { Transaction } from './types';

// Placeholder components for other screens to fit within limits
const Placeholder = ({ title, navigate }: { title: string, navigate: any }) => (
    <div className="p-6 pt-20 flex flex-col items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button onClick={() => navigate(Screen.HOME)} className="mt-4 text-blue-600 underline">Volver al inicio</button>
    </div>
);

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [accounts, setAccounts] = useState<Account[]>(ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(RECENT_TRANSACTIONS);
  const [selectedAccount, setSelectedAccount] = useState<Account>(ACCOUNTS[0]);
  const [transferAmount, setTransferAmount] = useState('0');
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [sourceAccount, setSourceAccount] = useState<Account>(ACCOUNTS[0]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [previousScreen, setPreviousScreen] = useState<Screen>(Screen.HOME);

  const navigateWithHistory = (screen: Screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };
  
  // Exchange Flow State
  const [exchangeAmount, setExchangeAmount] = useState('0');
  const [exchangeCurrency, setExchangeCurrency] = useState<'PEN' | 'USD'>('PEN');

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
    // Update account balance
    setAccounts(prev => {
      const newAccounts = prev.map(acc => {
        if (acc.id === sourceAccount.id) {
          const updatedAcc = { ...acc, balance: acc.balance + tx.amount };
          // Also update the sourceAccount state to keep it in sync for the next operation
          setSourceAccount(updatedAcc);
          return updatedAcc;
        }
        return acc;
      });
      return newAccounts;
    });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      // Auth
      case Screen.LOGIN: return <LoginScreen navigate={navigateWithHistory} />;
      case Screen.VERIFY_IDENTITY: return <VerifyIdentityScreen navigate={navigateWithHistory} />;
      case Screen.FACE_ID_SETUP: return <FaceIDSetup navigate={navigateWithHistory} />;
      case Screen.CONFIRM_DATA: return <ConfirmDataScreen navigate={navigateWithHistory} />;
      case Screen.CREATE_PASSWORD: return <CreatePasswordScreen navigate={navigateWithHistory} />;
      case Screen.VERIFICATION_SUCCESS: return <VerificationSuccessScreen navigate={navigateWithHistory} />;
      
      // Main Tabs
      case Screen.HOME: return <HomeScreen navigate={navigateWithHistory} onSelectAccount={setSelectedAccount} accounts={accounts} transactions={transactions} onSelectTransaction={setSelectedTransaction} />;
      case Screen.OPERATIONS: return <OperationsScreen navigate={navigateWithHistory} />;
      case Screen.FOR_YOU: return <ForYouScreen navigate={navigateWithHistory} />;
      case Screen.PROFILE: return <ProfileScreen navigate={navigateWithHistory} />;
      
      // Detail Screens
      case Screen.PRODUCT_DETAIL: return <ProductDetailScreen navigate={navigateWithHistory} account={selectedAccount} />;
      case Screen.NOTIFICATIONS: return <NotificationsScreen navigate={navigateWithHistory} />;
      case Screen.ALL_TRANSACTIONS: return <AllTransactionsScreen navigate={navigateWithHistory} transactions={transactions} onSelectTransaction={setSelectedTransaction} />;
      case Screen.TRANSACTION_DETAIL: return <TransactionDetailScreen navigate={navigateWithHistory} transaction={selectedTransaction} onBack={() => setCurrentScreen(previousScreen)} />;

      // Transfer Flow
      case Screen.TRANSFER_SELECT: return <TransferSelect navigate={navigateWithHistory} setRecipient={setSelectedRecipient} setAmount={setTransferAmount} />;
      case Screen.TRANSFER_AMOUNT: return <TransferAmount navigate={navigateWithHistory} amount={transferAmount} setAmount={setTransferAmount} recipient={selectedRecipient} sourceAccount={sourceAccount} setSourceAccount={setSourceAccount} />;
      case Screen.TRANSFER_CONFIRM: return <TransferConfirm navigate={navigateWithHistory} amount={transferAmount} recipient={selectedRecipient} sourceAccount={sourceAccount} addTransaction={addTransaction} />;
      case Screen.TRANSFER_SUCCESS: return <TransferSuccess navigate={navigateWithHistory} amount={transferAmount} recipient={selectedRecipient} sourceAccount={sourceAccount} />;

      // Exchange Flow
      case Screen.EXCHANGE: return <ExchangeScreen navigate={navigateWithHistory} amount={exchangeAmount} setAmount={setExchangeAmount} currency={exchangeCurrency} setCurrency={setExchangeCurrency} />;
      case Screen.EXCHANGE_CONFIRM: return <ExchangeConfirm navigate={navigateWithHistory} amount={exchangeAmount} currency={exchangeCurrency} />;
      case Screen.EXCHANGE_SUCCESS: return <ExchangeSuccess navigate={navigateWithHistory} amount={exchangeAmount} currency={exchangeCurrency} />;
      
      // Card Payment Flow
      case Screen.CARD_PAYMENT_SELECT: return <CardPaymentSelect navigate={setCurrentScreen} />;
      case Screen.CARD_PAYMENT_AMOUNT: return <CardPaymentAmount navigate={setCurrentScreen} />;
      case Screen.CARD_PAYMENT_SOURCE: return <CardPaymentSource navigate={setCurrentScreen} />;
      case Screen.CARD_PAYMENT_CONFIRM: return <CardPaymentConfirm navigate={setCurrentScreen} />;
      case Screen.CARD_PAYMENT_SUCCESS: return <CardPaymentSuccess navigate={setCurrentScreen} />;

      // Loan Flow
      case Screen.LOAN_SIMULATOR: return <LoanSimulator navigate={setCurrentScreen} />;
      case Screen.LOAN_REVIEW: return <LoanReview navigate={setCurrentScreen} />;
      case Screen.LOAN_TERMS: return <LoanTerms navigate={setCurrentScreen} />;
      case Screen.LOAN_SUCCESS: return <LoanSuccess navigate={setCurrentScreen} />;

      // Goals Flow
      case Screen.GOALS_LIST: return <GoalsList navigate={setCurrentScreen} />;
      case Screen.GOALS_CREATE_CATEGORY: return <GoalsCreateCategory navigate={setCurrentScreen} />;
      case Screen.GOALS_CREATE_DETAILS: return <GoalsCreateDetails navigate={setCurrentScreen} />;
      case Screen.GOALS_SUCCESS: return <GoalsSuccess navigate={setCurrentScreen} />;
      case Screen.GOAL_DETAIL: return <GoalDetail navigate={setCurrentScreen} />;

      // Services Flow
      case Screen.SERVICES_SELECT: return <ServicesSelect navigate={setCurrentScreen} />;
      case Screen.SERVICES_DETAILS: return <ServicesDetails navigate={setCurrentScreen} />;
      case Screen.SERVICES_DEBT: return <ServicesDebt navigate={setCurrentScreen} />;
      case Screen.SERVICES_CONFIRM: return <ServicesConfirm navigate={setCurrentScreen} />;
      case Screen.SERVICES_SUCCESS: return <ServicesSuccess navigate={setCurrentScreen} />;

      // QR Flow
      case Screen.QR_SCAN: return <QRScan navigate={setCurrentScreen} />;
      case Screen.QR_AMOUNT: return <QRAmount navigate={setCurrentScreen} />;
      case Screen.QR_CONFIRM: return <QRConfirm navigate={setCurrentScreen} />;
      case Screen.QR_SUCCESS: return <QRSuccess navigate={setCurrentScreen} />;

      // Statement Flow
      case Screen.STATEMENT_SELECT_PRODUCT: return <StatementSelectProduct navigate={setCurrentScreen} />;
      case Screen.STATEMENT_SELECT_PERIOD: return <StatementSelectPeriod navigate={setCurrentScreen} />;
      case Screen.STATEMENT_DELIVERY_METHOD: return <StatementDeliveryMethod navigate={setCurrentScreen} />;
      case Screen.STATEMENT_SUCCESS: return <StatementSuccess navigate={setCurrentScreen} />;

      // Profile Flow
      case Screen.PROFILE_EDIT: return <ProfileEdit navigate={setCurrentScreen} />;
      case Screen.PROFILE_SECURITY: return <ProfileSecurity navigate={setCurrentScreen} />;
      case Screen.PROFILE_HELP: return <ProfileHelp navigate={setCurrentScreen} />;
      case Screen.PROFILE_CARD_SETTINGS: return <ProfileCardSettings navigate={setCurrentScreen} />;
      case Screen.PROFILE_LOCATIONS: return <ProfileLocations navigate={setCurrentScreen} />;

      // Others
      case Screen.CARD_PAYMENT: return <CardPaymentSelect navigate={setCurrentScreen} />;
      
      default: return <HomeScreen navigate={setCurrentScreen} onSelectAccount={setSelectedAccount} />;
    }
  };

  return (
    <Layout activeScreen={currentScreen} navigate={setCurrentScreen}>
      {renderScreen()}
    </Layout>
  );
};

export default App;
