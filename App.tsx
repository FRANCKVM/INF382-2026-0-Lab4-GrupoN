import React, { useState } from 'react';
import { Screen, Account } from './types';
import { ACCOUNTS, RECENT_TRANSACTIONS } from './constants';
import { Layout } from './components/Layout';
import { LoginScreen, VerifyIdentityScreen, ScanDNIScreen, FaceIDSetup, ConfirmDataScreen, CreatePasswordScreen, VerificationSuccessScreen } from './screens/Auth';
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
import { ProfileEdit, ProfileSecurity, ProfileHelp, ProfileCardSelect, ProfileCardSettings, ProfileLocations } from './screens/flows/ProfileFlow';
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

  // Services Flow State
  const [selectedService, setSelectedService] = useState<any>(null);
  const [serviceSupply, setServiceSupply] = useState('');
  const [serviceAmount, setServiceAmount] = useState(0);
  const [favoriteServices, setFavoriteServices] = useState<any[]>([]);
  const [paidServices, setPaidServices] = useState<string[]>([]);

  const markServiceAsPaid = (serviceId: string, supply: string) => {
      setPaidServices(prev => [...prev, `${serviceId}-${supply}`]);
  };

  const addFavoriteService = (service: any, supply: string) => {
      setFavoriteServices(prev => {
          // Check if already exists
          if (prev.some(fav => fav.name === service.name && fav.savedSupply === supply)) {
              return prev;
          }
          return [...prev, { ...service, id: Date.now(), savedSupply: supply, detail: `Suministro: ${supply}` }];
      });
  };

  const addTransaction = (tx: Transaction) => {
    const targetAccountId = tx.accountId || sourceAccount.id;
    const txWithAccount = { ...tx, accountId: targetAccountId };
    setTransactions(prev => [txWithAccount, ...prev]);
    
    // Update account balance
    setAccounts(prev => {
      return prev.map(acc => {
        // Update the account where the transaction is recorded
        if (acc.id === targetAccountId) {
          const updatedAcc = { ...acc, balance: acc.balance + tx.amount };
          if (acc.id === sourceAccount.id) setSourceAccount(updatedAcc);
          return updatedAcc;
        }
        
        // If we are paying a card from another account, we also need to deduct from source
        if (targetAccountId !== sourceAccount.id && acc.id === sourceAccount.id) {
          const updatedAcc = { ...acc, balance: acc.balance - Math.abs(tx.amount) };
          setSourceAccount(updatedAcc);
          return updatedAcc;
        }
        
        return acc;
      });
    });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      // Auth
      case Screen.LOGIN: return <LoginScreen navigate={navigateWithHistory} />;
      case Screen.VERIFY_IDENTITY: return <VerifyIdentityScreen navigate={navigateWithHistory} />;
      case Screen.SCAN_DNI: return <ScanDNIScreen navigate={navigateWithHistory} />;
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
      case Screen.PRODUCT_DETAIL: return <ProductDetailScreen navigate={navigateWithHistory} account={selectedAccount} transactions={transactions} onSelectTransaction={setSelectedTransaction} />;
      case Screen.NOTIFICATIONS: return <NotificationsScreen navigate={navigateWithHistory} />;
      case Screen.ALL_TRANSACTIONS: return <AllTransactionsScreen navigate={navigateWithHistory} transactions={transactions} onSelectTransaction={setSelectedTransaction} />;
      case Screen.TRANSACTION_DETAIL: return <TransactionDetailScreen navigate={navigateWithHistory} transaction={selectedTransaction} accounts={accounts} onBack={() => setCurrentScreen(previousScreen)} />;

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
      case Screen.CARD_PAYMENT_SELECT: return <CardPaymentSelect navigate={setCurrentScreen} selectedCard={selectedAccount} />;
      case Screen.CARD_PAYMENT_AMOUNT: return <CardPaymentAmount navigate={setCurrentScreen} selectedCard={selectedAccount} />;
      case Screen.CARD_PAYMENT_SOURCE: return <CardPaymentSource navigate={setCurrentScreen} sourceAccount={sourceAccount} />;
      case Screen.CARD_PAYMENT_CONFIRM: return <CardPaymentConfirm navigate={setCurrentScreen} sourceAccount={sourceAccount} selectedCard={selectedAccount} addTransaction={addTransaction} />;
      case Screen.CARD_PAYMENT_SUCCESS: return <CardPaymentSuccess navigate={setCurrentScreen} selectedCard={selectedAccount} sourceAccount={sourceAccount} />;

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
      case Screen.SERVICES_SELECT: return <ServicesSelect navigate={setCurrentScreen} onSelectService={setSelectedService} favorites={favoriteServices} setSupply={setServiceSupply} previousScreen={previousScreen} />;
      case Screen.SERVICES_DETAILS: return <ServicesDetails navigate={setCurrentScreen} service={selectedService} supply={serviceSupply} setSupply={setServiceSupply} addFavorite={addFavoriteService} />;
      case Screen.SERVICES_DEBT: return <ServicesDebt navigate={setCurrentScreen} service={selectedService} supply={serviceSupply} setAmount={setServiceAmount} paidServices={paidServices} />;
      case Screen.SERVICES_CONFIRM: return <ServicesConfirm navigate={setCurrentScreen} service={selectedService} supply={serviceSupply} amount={serviceAmount} sourceAccount={sourceAccount} setSourceAccount={setSourceAccount} addTransaction={addTransaction} markServiceAsPaid={markServiceAsPaid} />;
      case Screen.SERVICES_SUCCESS: return <ServicesSuccess navigate={setCurrentScreen} service={selectedService} amount={serviceAmount} sourceAccount={sourceAccount} />;

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
      case Screen.PROFILE_CARD_SELECT: return <ProfileCardSelect navigate={setCurrentScreen} accounts={accounts} onSelectAccount={setSelectedAccount} />;
      case Screen.PROFILE_CARD_SETTINGS: return <ProfileCardSettings navigate={setCurrentScreen} account={selectedAccount} />;
      case Screen.PROFILE_LOCATIONS: return <ProfileLocations navigate={setCurrentScreen} />;

      // Others
      case Screen.CARD_PAYMENT: return <CardPaymentSelect navigate={setCurrentScreen} selectedCard={selectedAccount} />;
      
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
